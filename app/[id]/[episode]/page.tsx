'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EpisodeContainer from '@/components/episode';
import { Skeleton, BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { CONSUMET_URL } from '@/config';
import Link from 'next/link';
import { Episode, WatchDataSources } from '@/types';

const Watch = ({
	params,
}: {
	params: {
		id: string;
		episode: string;
	};
}) => {
	const { id, episode } = params;
	const [isLoading, setIsLoading] = useState(true);
	const [watchData, setWatchData] = useState<WatchDataSources[]>([]);

	const sleep = (ms: any) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const fetchDetails = useCallback(async () => {
		try {
			const server = 'vidcloud';

			const watchResponse = await axios.get<Episode>(
				`${CONSUMET_URL}/watch?episodeId=${id}&server=${server}`,
			);

			setWatchData(watchResponse.data.sources);
		} catch (error) {
			console.error('Error fetching details:', error);
		} finally {
			await sleep(5000);
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchDetails();
	}, [fetchDetails]);

	if (!watchData) {
		return (
			<div className='max-w-4xl mx-auto px-4 pt-10 pb-4'>
				{isLoading ? (
					<div className='flex flex-col items-center justify-center pb-5'></div>
				) : (
					<div className='flex flex-col items-center justify-center pb-5'>
						<div className='text-4xl font-bold mb-4'>No Results Found</div>
						<div className='text-gray-500'>Took a wrong turn?</div>
					</div>
				)}
				<Skeleton className='rounded-md'>
					<iframe
						src={`

            `}
						title='Embedded Video'
						width='100%'
						height='450'
						scrolling='no'
						allowFullScreen
						className='max-w-3xl mx-auto px-4 pt-10'
					></iframe>
				</Skeleton>
			</div>
		);
	}
	const defaultSourceUrl = watchData
		.map((value, index, array) => {
			const source = value as WatchDataSources;
			if (source.isM3U8) {
				return source.url;
			}
			return null;
		})
		.filter((url) => url !== null)[0];
	return (
		<div className='pb-1 mx-auto px-4 pt-10'>
			<div className='pb-4'>
				<div className='flex flex-col text-center items-center justify-center'>
					<div className='flex flex-col flex-wrap pb-2'>
						<Breadcrumbs size='lg'>
							<BreadcrumbItem>
								<Link href={`/${id}`}>Back to Series</Link>
							</BreadcrumbItem>
							<BreadcrumbItem>{episode}</BreadcrumbItem>
						</Breadcrumbs>
					</div>
				</div>
			</div>
			<div className='max-w-4xl mx-auto flex'>
				<MediaPlayer src={defaultSourceUrl ?? ''}>
					<MediaProvider />
					<DefaultVideoLayout icons={defaultLayoutIcons} />
				</MediaPlayer>
			</div>
		</div>
	);
};

export default Watch;
