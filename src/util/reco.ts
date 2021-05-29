export const reco = async (param: { shape: number[][]; track: number[][] }) => {
  const data = await (
    await fetch('http://101.132.144.199:5000/reco', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
  ).json();
  if (data.code === 0) {
    return data.data as string;
  }
};
