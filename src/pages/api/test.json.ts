import type { APIRoute } from 'astro';
// import getVersion from '../utils/getVersion';

export const POST: APIRoute = async ({ request }) => {
  let url;
  const contentType = request.headers.get('Content-Type');
  if (contentType === 'application/json') {
    const data = await request.json();
    url = data.url;
  } else if (contentType === 'application/x-www-form-urlencoded') {
    const data = await request.formData();
    url = data.get('url');
  }

  if (typeof url !== 'string') {
    return new Response(JSON.stringify({ message: 'Missing URL' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  let version;
  try {
    // version = await getVersion(url);
    version = 'test';
  } catch (error) {
    const message = (error as Error)?.message;

    // Better message for URL not found
    if (message.includes('ERR_NAME_NOT_RESOLVED')) {
      console.log(`404: Not Found for ${url}`);
      return {
        body: JSON.stringify({
          message: '404: Not Found. Please check the URL.',
        }),
      };
    }

    if (message.includes('timeout')) {
      console.log(`Timeout loading ${url}`);
      return {
        body: JSON.stringify({
          message:
            'Timed out waiting for page to load. Please check the page loads in your browser. If the problem persists, please try again later.',
        }),
      };
    }

    console.log(`Error loading ${url}`);
    console.error(error);
    return new Response(
      JSON.stringify({
        message: 'Error detecting version. Please try again later.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  console.log(
    version
      ? `Detected version ${version} for ${url}`
      : `No version detected for ${url}`
  );

  return new Response(JSON.stringify({ version }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
