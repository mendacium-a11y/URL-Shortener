const apiLink = import.meta.env.VITE_API_URL + 'links'

export const addLink = async (url: string) => {
  try {
    const urlRegex = /^(https?):\/\/(www\.)?([a-zA-Z0-9\-.]+\.)([a-zA-Z0-9-.]+)\/?([a-zA-z0-9\/?=%&-]+)?$/

    if (!urlRegex.test(url)) {
      return null;
    }

    const response = await fetch(`${apiLink}/addlink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    console.log("Request")
    const result = await response.json();
    if (response.status !== 200) {
      throw new Error('Failed to post data');
    }
    return result
  } catch (error) {
    console.error('Error posting data:', error);
    return null
  }
}

export const redirectLink = async (key: string) => {
  try {
    const response = await fetch(`${apiLink}/getlink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key })
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
        
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}