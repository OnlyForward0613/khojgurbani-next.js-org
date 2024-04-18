'use client'

export async function getData(url: string, tags?: string) {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        cache: 'no-store',
    };

    if (tags) {
        requestOptions.next = { tags: [tags] };
    }

    const res = await fetch(
        "https://api2.khojgurbani.org/api/v1" + url,
        requestOptions
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${url} with error ${res.status}`);
    }

    console.log("https://api2.khojgurbani.org/api/v1", url, res.status);
    return res.json();
}

export async function postData(url: string, payload: any, tags?: string) {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
    };

    if (tags) {
        requestOptions.next = { tags: [tags] };
    }

    const res = await fetch(
        "https://api2.khojgurbani.org/api/v1" + url,
        requestOptions
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${url} with error ${res.status}`);
    }

    console.log("https://api2.khojgurbani.org/api/v1", url, res.status);
    return res.json();
}