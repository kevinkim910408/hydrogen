import {useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {PRODUCT_QUERY} from '@/graphql/product';

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {shop} = await storefront.query(PRODUCT_QUERY);

  return defer({shop});
}
const Home = () => {
  const {shop} = useLoaderData<typeof loader>();
  console.log(shop);

  console.log(shop.name);
  return <div className="text-[5rem]">asdasdadas</div>;
};

export default Home;
