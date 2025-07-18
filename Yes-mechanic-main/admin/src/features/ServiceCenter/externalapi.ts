import axios from 'axios';

export const fetchCountries = async (state:string) => {
      try {
        console.log(state,"states")
        const config = {
          method: 'get',
          url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
          headers: {
            'X-CSCAPI-KEY': 'aFdERVQ4SGVUeUcwdXcyUm5lNEpaanhMYXlnZkF0UjJMV3JxMjkxUg==' // Replace with your actual API key
          }
        };

        const response = await axios(config);
        return response;
      } catch (err) {
        console.log(err);
      }
    };

export const fetchAllCountries = async () => {
      try {
        const config = {
          method: 'get',
          url: `https://api.countrystatecity.in/v1/countries`,
          headers: {
            'X-CSCAPI-KEY': 'aFdERVQ4SGVUeUcwdXcyUm5lNEpaanhMYXlnZkF0UjJMV3JxMjkxUg==' 
          }
        };

        const response = await axios(config);
        return response;
      } catch (err) {
        console.log(err);
      }
    };


 export const fetchState = async () => {
  try {
    const config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries/IN/states',
      headers: {
        'X-CSCAPI-KEY': 'aFdERVQ4SGVUeUcwdXcyUm5lNEpaanhMYXlnZkF0UjJMV3JxMjkxUg=='
      }
    };

    const response = await axios(config);
    return response;
  } catch (err) {
    console.log(err);
  }
};


