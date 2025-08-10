'use client';

import { useState } from 'react';
import { PhotoCarousel } from '@/components/photo-carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

import albumsData from '../public/albums-metadata.json';

const getAlbumById = (id: string) => albumsData.find((album) => album.id === id);

export function PhotoGallery() {
	const [selectedAlbumId, setSelectedAlbumId] = useState(albumsData[0].id);

	const currentAlbum = getAlbumById(selectedAlbumId);

	if (!currentAlbum) {
		return <div>Album non trovato.</div>;
	}

	return (
		<>
			<div className="mt-7">
				<PhotoCarousel images={currentAlbum.images} />
			</div>

			<div className="mt-6 flex justify-center">
				<Label htmlFor="album-select" className="sr-only">
					Album:
				</Label>
				<Select value={selectedAlbumId} onValueChange={setSelectedAlbumId}>
					<SelectTrigger id="album-select">
						<SelectValue placeholder="Seleziona un album" />
					</SelectTrigger>
					<SelectContent>
						{albumsData.map((album) => (
							<SelectItem key={album.id} value={album.id}>
								{album.displayName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</>
	);
}
