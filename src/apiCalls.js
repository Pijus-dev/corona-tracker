export const fetchCountries = async () => {
  const response = await fetch("https://covid19.mathdro.id/api/countries");
  const data = await response.json();
  const { countries } = data;
  return countries;
};

export const fetchTotalData = async () => {
  const response = await fetch("https://covid19.mathdro.id/api/daily");
  const data = await response.json();

  const finalData = data.map(
    ({ confirmed, deaths, recovered, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      recovered: recovered.total,
      date,
    })
  );

  return finalData;
};

export const handleSubmit = async (country) => {
  const res = await fetch(
    `https://covid19.mathdro.id/api/countries/${country}`
  );
  const data = await res.json();
  return data;
};

export const getTotalNumbers = async () => {
  const res = await fetch("https://covid19.mathdro.id/api");
  const data = await res.json();
  return data;
};

export const fetchNews = async () => {
  const res = await fetch(
    "https://rapidapi.p.rapidapi.com/topic-research?limit=20&search=corona&from=2020-09-10&skip=1&langs=en",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "news67.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_KEY}`,
      },
    }
  );
  const data = await res.json();
  const { news } = data;
  return news;
};
