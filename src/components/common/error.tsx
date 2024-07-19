export const Error = ({ className = "", message = "" }: { className?: string, message?: string }) => (
  <main className={`px-4 h-dvh flex flex-col items-center justify-center -mt-5 ${className}`}>
    <h1
      className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-6 lg:mt-10"
    >Ups, hubo un error :(</h1>
    <p className="text-center mt-3 text-text-100">{message}</p>
  </main>
)