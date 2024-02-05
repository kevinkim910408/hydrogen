import {Flex, Text, Button} from '@radix-ui/themes';
import {useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {PRODUCT_QUERY} from '~/graphql/product';

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {shop} = await storefront.query(PRODUCT_QUERY);
  return defer({shop});
}

const Home = () => {
  const {shop} = useLoaderData<typeof loader>();
  console.log(shop.name);
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  );
};

export default Home;
