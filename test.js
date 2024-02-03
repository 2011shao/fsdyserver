import axios from "axios";

async function resolveShortUrl(shortUrl) {
  try {
    const response = await axios.head(shortUrl);
    const longUrl = response.headers.location || shortUrl;
    console.log('Original URL:', response.request.path);
  } catch (error) {
    console.error('Error resolving short URL:', error.message);
  }
}

const shortUrl = 'https://v.douyin.com/iLoHFdpK/';
resolveShortUrl(shortUrl);