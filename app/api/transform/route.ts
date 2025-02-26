import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rateLimiter';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    const ip = req.ip || 'anonymous';
    
    if (!rateLimiter.canMakeRequest(ip)) {
        return NextResponse.json(
            { error: 'Rate limit exceeded. Please wait 1 second.' },
            { status: 429 }
        );
    }

    try {
        const formData = await req.formData();
        const image = formData.get('image') as File;
        const rows = Number(formData.get('rows')) || 2;
        const cols = Number(formData.get('cols')) || 2;

        if (!image) {
            return NextResponse.json(
                { error: 'Missing image' },
                { status: 400 }
            );
        }

        const buffer = await image.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);

        const { width, height } = await sharp(imageBuffer).metadata();
        if (!width || !height) {
            throw new Error('Invalid image dimensions');
        }

        const tileWidth = Math.floor(width / cols);
        const tileHeight = Math.floor(height / rows);

        const tiles = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const tile = await sharp(imageBuffer)
                    .extract({
                        left: x * tileWidth,
                        top: y * tileHeight,
                        width: tileWidth,
                        height: tileHeight
                    })
                    .toBuffer();
                tiles.push(tile.toString('base64'));
            }
        }

        return NextResponse.json({ 
            success: true, 
            result: {
                tiles,
                dimensions: { width, height, tileWidth, tileHeight }
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process image' },
            { status: 500 }
        );
    }
}
