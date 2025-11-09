import { AppRouter } from "./providers/router/AppRouter"

function App() {
  console.log('Render App')
  return (
    <div>
      {/* Здесь в будущем будет общий лейаут: Header, Sidebar... */}
      <AppRouter /> {/* А здесь будет отображаться текущая страница */}
    </div>
  )
}

export default App
