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
    "https://newsapi.org/v2/top-headlines?q=covid-19&language=en&sortBy=publishedAt&apiKey=906a42b176b34597b23bc0d302880ece"
  );
  const data = await res.json();
  const { articles } = data;

  // const info = articles.filter(
  //   (val, idx, array) => array.findIndex((t) => t.title === val.title) === idx
  // );

  return articles;
};
