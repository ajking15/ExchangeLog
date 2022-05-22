import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const styling = {
    backgroundImage: `url('https://unsplash.com/photos/T9rKvI3N0NM')`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
}
  return <Component style={styling} {...pageProps} />
}

export default MyApp
