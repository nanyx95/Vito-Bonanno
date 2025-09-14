'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi
} from '@/components/ui/carousel';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookImage } from 'lucide-react';

type ImageProps = {
	src: string;
	alt: string;
};

type PhotoGalleryProps = {
	id: string;
	displayName: string;
	images: ImageProps[];
}[];

export function PhotoGallery({ albums }: { albums: PhotoGalleryProps }) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [selectedAlbumId, setSelectedAlbumId] = useState(albums && albums.length > 0 ? albums[0].id : undefined);

	useEffect(() => {
		if (!api) {
			return;
		}

		const onSelect = () => {
			setCurrent(api.selectedScrollSnap() + 1);
		};

		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', onSelect);

		return () => {
			api.off('select', onSelect);
		};
	}, [api]);

	// Reset carousel to the first slide when the album changes
	useEffect(() => {
		if (api) {
			api.scrollTo(0);
		}
	}, [api, selectedAlbumId]);

	if (!selectedAlbumId) {
		return <p>Nessun album fotografico da mostrare.</p>;
	}

	const getAlbumById = (id: string) => albums.find((album) => album.id === id);
	const currentAlbum = getAlbumById(selectedAlbumId);
	if (!currentAlbum) {
		return <p>Album non trovato.</p>;
	}

	return (
		<div className="mx-auto mt-7 max-w-sm sm:max-w-md md:max-w-[500px]">
			<Carousel setApi={setApi}>
				<CarouselContent>
					{currentAlbum.images.map((image, index) => (
						<CarouselItem key={index} className="flex items-center justify-center">
							<figure className="relative">
								<Image
									src={image.src}
									alt={image.alt}
									width={500}
									height={500}
									priority={true}
									className="rounded-lg"
								/>
								<figcaption className="absolute inset-x-1.5 bottom-1.5 rounded-md bg-black/30 px-3 py-2 backdrop-blur-sm">
									<p className="text-xs text-pretty text-white">{image.alt}</p>
								</figcaption>
							</figure>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="mt-3 grid grid-cols-[auto_1fr] justify-between gap-5">
					<div className="flex items-center gap-2.5">
						<AlbumSelector albums={albums} selectedAlbumId={selectedAlbumId} setSelectedAlbumId={setSelectedAlbumId} />
						<div className="h-6">
							<Separator orientation="vertical" />
						</div>
						<CarouselPrevious className="static translate-none" />
						<CarouselNext className="static translate-none" />
					</div>
					<div className="self-center-safe justify-self-end-safe text-sm text-neutral-500 dark:text-neutral-400">
						Foto {current} di {currentAlbum.images.length}
					</div>
				</div>
			</Carousel>
		</div>
	);
}

function AlbumSelector({
	albums,
	selectedAlbumId,
	setSelectedAlbumId
}: {
	albums: PhotoGalleryProps;
	selectedAlbumId: string | undefined;
	setSelectedAlbumId: (id: string) => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="size-8 rounded-full">
					<BookImage />
					<span className="sr-only">Seleziona l&apos;album fotografico</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuLabel>Album fotografico</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={selectedAlbumId} onValueChange={setSelectedAlbumId}>
					{albums.map((album) => (
						<DropdownMenuRadioItem key={album.id} value={album.id}>
							{album.displayName}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
