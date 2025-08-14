import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head, Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import './globals.css';

const navbar = <Navbar logo={<b>La Storia di Vito Bonanno</b>} />;
const search = (
	<Search
		placeholder="Cerca nelle memorie..."
		emptyResult="Nessuna corrispondenza"
		errorText="Errore di ricerca"
		loading="Caricamento..."
	/>
);

const footer = (
	<Footer className="flex flex-col gap-4 text-sm">
		<div>
			<p>
				Trascrizioni dal diario manoscritto di Vito Bonanno a cura di Roberto Somaglia. Sito web sviluppato da Fabio
				Somaglia.
			</p>
			<a
				href="http://web.tiscali.it/vito_bonanno/"
				target="_blank"
				rel="noopener noreferrer"
				className="after:content-['_↗'] hover:text-black dark:hover:text-gray-200"
			>
				Visita il sito originale di Roberto Somaglia.
			</a>
		</div>
		<p>© {new Date().getFullYear()} Fabio Somaglia.</p>
	</Footer>
);

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="it"
			dir="ltr"
			// Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
			suppressHydrationWarning
		>
			<Head></Head>
			<body>
				<Layout
					navbar={navbar}
					search={search}
					pageMap={await getPageMap()}
					toc={{
						title: 'In questa pagina',
						backToTop: 'Torna su'
					}}
					editLink={null}
					feedback={{ content: null }}
					themeSwitch={{
						dark: 'Scuro',
						light: 'Chiaro',
						system: 'Sistema'
					}}
					footer={footer}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
