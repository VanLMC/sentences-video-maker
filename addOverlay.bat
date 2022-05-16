
del "content\output\output.mp4"

Set /a num=%random% %% 2 + 1
echo %num%
ffmpeg   -i overlay/Background-%num%.mp4 -i content/output/slideShow.mp4 -i overlay/Music.mp3 -threads 2  -filter_complex  "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2; amovie=overlay/Music.mp3:loop=999, volume=0.1[s];[1][s]amix=duration=shortest"  -c:a aac -b:a 192k -c:v libx264 -shortest content/output/output.mp4

