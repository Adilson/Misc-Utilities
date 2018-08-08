SET NOCOUNT ON


DECLARE @NoExecute BIT = 0
DECLARE @Enterprise BIT = 1

DECLARE @Idx TABLE (
	TableName VARCHAR(200),
	object_id BIGINT,
	Name VARCHAR(200),
	index_id INT,
	isClustered BIT,
	isXmlIndex BIT,
	isSpatialIndex BIT,
	AverageFragmentation FLOAT
)

insert into @Idx
select 
	IX.*,
	IXS.AverageFragmentation
	--IXS.*
from (
	SELECT 
		tbl.name AS TableName, 
		tbl.object_id, 
		i.name AS [Name], 
		i.index_id, 
		CAST (CASE i.index_id WHEN 1 THEN 1 ELSE 0 END AS bit) AS [IsClustered], 
		CAST (case when i.type=3 then 1 else 0 end AS bit) AS [IsXmlIndex], 
		CAST (case when i.type=4 then 1 else 0 end AS bit) AS [IsSpatialIndex]
	FROM sys.tables AS tbl
	INNER JOIN sys.indexes AS i ON (i.index_id > 0 and i.is_hypothetical = 0) AND (i.object_id=tbl.object_id)
) IX
inner join (
	SELECT 
		--tbl.object_id, 
		--i.index_id, 
		fi.avg_fragmentation_in_percent AS [AverageFragmentation],
		fi.*
	FROM sys.tables AS tbl
	INNER JOIN sys.indexes AS i ON (i.index_id > 0 and i.is_hypothetical = 0) AND (i.object_id=tbl.object_id)
	INNER JOIN sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS fi ON fi.object_id=CAST(i.object_id AS int) AND fi.index_id = CAST(i.index_id AS int)
) IXS on IX.object_id = IXS.object_id and IX.index_id = IXS.index_id
where IXS.page_count < 10240 and IXS.page_count > 15
order by AverageFragmentation desc


select * from @Idx
where [AverageFragmentation] > 5
order by objecT_id, index_id

DECLARE @IndexName VARCHAR(200)
DECLARE @TableName VARCHAR(200)
DECLARE @IndexFrag FLOAT
DECLARE @ObjectID BIGINT = 0
DECLARE @IndexID INT = 0

DECLARE @SQL NVARCHAR(3000)

WHILE 1=1
BEGIN
	SELECT TOP 1
		@ObjectID = [object_id],
		@IndexID = index_id,
		@TableName = TableName,
		@IndexName = [Name],
		@IndexFrag = AverageFragmentation
	FROM @Idx
	WHERE 
		(
			[object_id] > @ObjectID OR 
			([object_id] = @ObjectID AND index_id > @IndexID)
		)
		and [AverageFragmentation] > 5
	ORDER BY [object_id], index_id

	IF @@ROWCOUNT = 0
		BREAK
	
	IF @IndexFrag > 30
	BEGIN
		PRINT '--Reorganize ' + @TableName + ', ' + @IndexName + '...'
		SET @SQL = N'ALTER INDEX [' + @IndexName + '] ON [' + @TableName + '] REORGANIZE'
		IF @NoExecute = 1
			PRINT @SQL
		ELSE
			EXEC sp_executeSQL @SQL
		PRINT '--OK!'
		PRINT ''
	END
	ELSE
	BEGIN
		PRINT '--Rebuild ' + @TableName + ', ' + @IndexName + '...'
		SET @SQL = N'ALTER INDEX [' + @IndexName + '] ON [' + @TableName + '] REBUILD'
		if @Enterprise = 1
			SET @SQL = @SQL + ' WITH (ONLINE = ON)'
		IF @NoExecute = 1
			PRINT @SQL
		ELSE
			EXEC sp_executeSQL @SQL
		PRINT '--OK!'
		PRINT ''
	END
END