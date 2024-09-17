import HeaderTitle from "../common/HeaderTitle";
import { Link } from "react-router-dom";
import useGetCountries from "../../utils/hooks/useGetCountries";

const Countries = () => {

  const { countries } = useGetCountries();

  return (
    <main id="countries" className="text-white">
      <div className="container flex flex-col gap-10">
        <HeaderTitle title="Country List" />

        <div className="country-grid mt-3 gap-2">
          {countries.length > 0 &&
            countries.map((country) => (
              <Link
                to={`/shows/country=${country.iso_3166_1}/page=1`}
                className="bg-charcoal py-3 rounded-md hover:bg-red-800 text-center duration-300"
                key={country.iso_3166_1}
              >
                {country.english_name}
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Countries;
