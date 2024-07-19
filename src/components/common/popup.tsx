export const Popup = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed top-0 left-0 w-screen h-screen bg-bg-50/50 flex justify-center items-center entry backdrop-blur-sm">
    {children}
  </div>
)