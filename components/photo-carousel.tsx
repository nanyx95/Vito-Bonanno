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

type ImageProps = {
	src: string;
	alt: string;
};

type PhotoCarouselProps = {
	images: ImageProps[];
};

export function PhotoCarousel({ images }: PhotoCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

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
	}, [api, images]);

	return (
		<div className="mx-auto max-w-2xs sm:max-w-sm md:max-w-md">
			<Carousel className="w-full max-w-2xs sm:max-w-sm md:max-w-md" setApi={setApi}>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index} className="flex items-center justify-center">
							<div className="p-1">
								<Image
									src={image.src}
									alt={image.alt}
									width={500}
									height={500}
									priority={true}
									className="rounded-lg"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="py-2 text-center text-sm text-neutral-500 dark:text-neutral-400">{images[current - 1]?.alt}</div>
		</div>
	);
}
