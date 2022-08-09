### Fork with Worker thread

Так как fork использует IPC канал для передачи, скорость работы 
с большими файлами увеличивается, а для worker threads только выделяется
дополнительная память.
![](../public/forkWithWorker.png)
![](../public/whatUseForkOrWorker.png)