-- CreateIndex
CREATE INDEX "SubTask_title_status_taskId_startDate_idx" ON "SubTask"("title", "status", "taskId", "startDate" DESC);

-- CreateIndex
CREATE INDEX "Task_title_status_userId_startDate_idx" ON "Task"("title", "status", "userId", "startDate" DESC);
