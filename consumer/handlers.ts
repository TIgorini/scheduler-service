const commonHandler = (event: string) => {
  console.log(`[${new Date()}] ${event}`)
}

export const defaultHandler = () => commonHandler('Unexpected event happened.')
export const unicornsHandler = () => commonHandler('Unicorns occupied your console.')
export const gnomesHandler = () => commonHandler('Gnomes broke into your system.')
export const fairiesHandler = () => commonHandler('Fairies stole your cookies.')
