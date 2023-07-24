DECLARE @IndexName VARCHAR(200) = 'IX_Task_StandBy'
DECLARE @TableName VARCHAR(200) = ''
DECLARE @Keys VARCHAR(MAX) = ''
DECLARE @Included VARCHAR(MAX) = ''
DECLARE @Filter VARCHAR(MAX) = ''
DECLARE @Unique BIT = 0

select 
	@Keys = STRING_AGG('['+x.Name+']' + CASE WHEN x.is_descending_key = 1 THEN ' DESC' ELSE '' END, ', ')
from (
	select top 1000
		C.Name,
		IC.is_descending_key
	from sys.indexes IX
	inner join sys.index_columns IC ON IC.object_id = IX.object_id and IC.index_id = IX.index_id
	inner join sys.columns C ON C.object_id = IX.object_id and C.column_id = IC.column_id
	where IX.Name = @IndexName
		and is_included_column = 0
	order by IC.key_ordinal
) x

select 
	@Included = STRING_AGG('['+x.Name+']' + CASE WHEN x.is_descending_key = 1 THEN ' DESC' ELSE '' END, ', ')
from (
	select top 1000
		C.Name,
		IC.is_descending_key
	from sys.indexes IX
	inner join sys.index_columns IC ON IC.object_id = IX.object_id and IC.index_id = IX.index_id
	inner join sys.columns C ON C.object_id = IX.object_id and C.column_id = IC.column_id
	where IX.Name = @IndexName
		and is_included_column = 1
	order by IC.key_ordinal
) x

select 
	@TableName = '['+SCHEMA_NAME(O.schema_id) + '].[' + O.Name + ']'
from sys.indexes IX
inner join sys.objects O ON O.object_id = IX.object_id
where IX.Name = @IndexName

select @Filter = filter_definition, @Unique = is_unique
FROM sys.indexes 
where Name = @IndexName

SELECT 'CREATE ' + CASE WHEN @Unique = 1 THEN 'UNIQUE ' ELSE '' END + 'INDEX [' 
	+ @IndexNAme + '] ON ' + @TableName + ' (' + @Keys + ')'
	+ CASE WHEN IsNull(@Included,'') = '' THEN '' ELSE ' INCLUDE (' + @Included + ')' END
	+ CASE WHEN @Filter IS NULL THEN '' ELSE ' WHERE (' + @Filter + ')' END

--select * from sys.indexes where Name = @IndexName