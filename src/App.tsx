import { AppRouter } from "./app/providers/router/AppRouter"

function App() {
  return (
    <div>
      {/* Здесь в будущем будет общий лейаут: Header, Sidebar... */}
      <AppRouter /> {/* А здесь будет отображаться текущая страница */}
    </div>
  )
}

export default App
