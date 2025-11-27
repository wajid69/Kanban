import React from 'react'
import TaskCard from './TaskCard'
import { useUIStore } from '../store/uiStore'

export default React.memo(function Column({ id, title, tasks, onDrop, onEdit }) {
  const setDragging = useUIStore((s) => s.setDragging)
  const dragging = useUIStore((s) => s.dragging)

  // Handle Drag
  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  // Handle Drop
  function handleDrop(e) {
    e.preventDefault()
    const raw = e.dataTransfer.getData('application/json')
    if (!raw) return
    try {
      const payload = JSON.parse(raw)
      onDrop(payload.task, id)
      setDragging(null)
    } catch {}
  }

  // Handle Touch
  function handleTouchEnd(e) {
    if (!dragging) return
    onDrop(dragging, id)
    setDragging(null)
  }
  return (
    <div 
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
      onTouchEnd={handleTouchEnd}
      className={`bg-white rounded shadow p-3 min-h-[200px] transition-all ${
        dragging ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:ring-2 hover:ring-blue-200'
      }`}
    >
      <h2 className='text-lg font-medium mb-2'>{title}</h2>
      <div className='space-y-2'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={() => onEdit(task)} />
        ))}
      </div>
      {tasks.length === 0 && <div className='text-sm text-gray-400 mt-3'>No tasks</div>}
    </div>
  )
})
