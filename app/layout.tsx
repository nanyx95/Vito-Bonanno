import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import './globals.css';

export const metadata = {
	// Define your metadata here
	// For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const navbar = (
	<Navbar
		logo={<b>La Storia di Vito Bonanno</b>}
		// ... Your additional navbar options
	/>
);
const footer = <Footer>{new Date().getFullYear()} © Fabio Somaglia.</Footer>;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			// Not required, but good for SEO
			lang="it"
			// Required to be set
			dir="ltr"
			// Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
			suppressHydrationWarning
		>
			<Head
			// ... Your additional head options
			>
				{/* Your additional tags should be passed as `children` of `<Head>` element */}
			</Head>
			<body>
				<Layout
					navbar={navbar}
					pageMap={await getPageMap()}
					toc={{ title: 'In questa pagina' }}
					editLink={null}
					feedback={{ content: null }}
					themeSwitch={{
						dark: 'Scuro',
						light: 'Chiaro',
						system: 'Sistema'
					}}
					footer={footer}
					// ... Your additional layout options
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
