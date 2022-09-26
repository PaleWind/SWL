import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  // if (!session) {
  //   return res.status(401).send('signin required');
  // }
  //dev id
  const PAYPAL_CLIENT_ID='AS0UJucxLMjKRvxS9BxZgTiIXwDQqEvqqEse3oSf_PI4Z3wPG-MCT2K9AZCACeNEza2A3cEAjkONrtW6'

  res.send(PAYPAL_CLIENT_ID || 'sb');
  //(PAYPAL_CLIENT_ID);
};
export default handler;
