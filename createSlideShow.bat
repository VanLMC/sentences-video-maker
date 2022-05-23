@echo OFF
setlocal EnableDelayedExpansion

del "content\output\slideShow.mp4"

set i=0
for %%g in (content/audios/*) do (
   echo file !i!.mp4 >> content/videos/files.txt
   ffmpeg -y -loop 1 -i content/images/!i!-sentence.png -i content/audios/!i!.mp3 -threads 2 -fflags +shortest -c:v libx264 -c:a aac -b:a 192k -vf format=yuv420p -shortest content/videos/!i!.mp4
   set /A i+=1
   echo !i!

)

ffmpeg -y -f concat -safe 0 -i content/videos/files.txt -c copy content/output/slideShow.mp4



del /S "content\videos\*.mp4"
del "content\videos\files.txt"
