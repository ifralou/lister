import './globals.css'
export const metadata = {
  title: 'Lister',
  description: 'Simple way to create and share your tasks.',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
