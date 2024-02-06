import {useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {PRODUCT_QUERY} from '~/graphql/product';
import * as Popover from '@radix-ui/react-popover';

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {shop} = await storefront.query(PRODUCT_QUERY);

  return defer({shop});
}
const Home = () => {
  const {shop} = useLoaderData<typeof loader>();
  console.log(shop);

  console.log(shop.name);
  return (
    <Popover.Root>
      <Popover.Trigger className="bg-black rounded-md px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
        {shop.name}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-black rounded-md p-5 w-64 text-white">
          Some content
          <Popover.Arrow className="fill-black" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Home;
