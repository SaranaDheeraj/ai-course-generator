import { getAuthSession } from "@/lib/auth";

export async function getStaticProps() {
  const session = await getAuthSession();

  return {
    props: {
      session,
    },
  };
}
