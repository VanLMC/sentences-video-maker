
# Create one video per slide
for file in content/audios/*.mp3 
do
    number=$(echo $file | cut -f 1 -d '.')
    ffmpeg -y -loop 1 -i content/images/$number.jpg -i tmp-$file -c:v libx264 -c:a aac -b:a 192k -vf format=yuv420p -shortest content/videos/$number.mp4


    echo "file 'content/videos/$number.mp4'" >> files.txt
done

# # Merge videos
# ffmpeg -y -f concat -safe 0 -i content/videos/files.txt -movflags +faststart -c copy content/output/output.mp4


# # Clean up

# rm content/videos/*.mp4
# rm content/videos/files.txt