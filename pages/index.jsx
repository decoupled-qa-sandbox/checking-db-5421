import { NextSeo } from 'next-seo';
import { setOutgoingHeaders } from '../lib/setOutgoingHeaders';
import Image from 'next/image';
import Layout from '../components/layout';
import { PostGrid } from '../components/grid';
import { getFooterMenu } from '../lib/Menus';
import { getLatestPosts } from '../lib/Posts';

export default function Home({ menuItems, posts }) {
	const HomepageHeader = () => (
		<div className="prose sm:prose-xl mt-20 flex flex-col mx-auto max-w-fit">
			<h1 className="prose text-4xl text-center h-full">
				Welcome to{' '}
				<a
					className="text-blue-600 no-underline hover:underline"
					href="https://nextjs.org"
				>
					Next.js!
				</a>
			</h1>
			<div className="text-2xl">
				<div className="bg-black text-white rounded flex items-center justify-center p-4">
					Decoupled WordPress on{' '}
					<Image
						src="/pantheon.png"
						alt="Pantheon Logo"
						style={{
							margin: 0,
						}}
						width={191}
						height={60}
					/>
				</div>
			</div>
		</div>
	);

	return (
		<Layout footerMenu={menuItems}>
			<NextSeo
				title="Decoupled Next WordPress Demo"
				description="Generated by create-pantheon-decoupled-kit."
			/>
			<HomepageHeader />
			<section>
				<PostGrid contentType="posts" data={posts} />
			</section>
		</Layout>
	);
}

export async function getServerSideProps({ res }) {
	console.log("headers here!");
	
	const { menuItems, menuItemHeaders } = await getFooterMenu();
	const { posts, headers: postHeaders } = await getLatestPosts(12);

	const headers = [menuItemHeaders, postHeaders];
	console.log(headers);
	setOutgoingHeaders({ headers, res });
	return {
		props: {
			menuItems,
			posts,
		},
	};
}
