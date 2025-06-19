interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 bg-[#212224] text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1920')] bg-cover bg-center opacity-20"></div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
        {description && <p className="max-w-3xl mx-auto text-white/80 text-lg md:text-xl">{description}</p>}
      </div>
    </section>
  )
}
