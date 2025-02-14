import NextTopLoader from 'nextjs-toploader'

export default function TopLoader() {
  return (
    <>
        <NextTopLoader
            color="#e11d48"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #e11d48"
        />
    </>
  )
}