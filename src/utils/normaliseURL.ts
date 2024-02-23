export default function normaliseURL(url: string) {
    url = url.trim();
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://${url}`;
  }
  