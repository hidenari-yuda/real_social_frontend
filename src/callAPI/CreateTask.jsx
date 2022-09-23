import React from 'react'

export default function createTask({ inputedTask}) {
  const postTask = async () => {
  try {
    await axios.post('/tasks', inputedTask)
  } catch (err) {
    console.log(err);
  }
}

  return (
    <div>createTask</div>
  )
}
