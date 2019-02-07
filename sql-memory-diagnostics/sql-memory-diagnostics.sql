--Memory overview
SELECT TOP 10 [type], SUM(pages_kb) / 1024 AS SizeMb
FROM sys.dm_os_memory_clerks
GROUP BY [type]
ORDER BY SUM(pages_kb) / 1024 DESC

--Detail on MEMORYCLERK_SQLBUFFERPOOL
SELECT COUNT(*)AS cached_pages_count  
  ,name ,index_id , COUNT(*)*8.0/1024 MiBytes
FROM sys.dm_os_buffer_descriptors AS bd  
  INNER JOIN  
  (  
      SELECT object_name(object_id) AS name  
          ,index_id ,allocation_unit_id  
      FROM sys.allocation_units AS au  
          INNER JOIN sys.partitions AS p  
              ON au.container_id = p.hobt_id  
                  AND (au.type = 1 OR au.type = 3)  
      UNION ALL  
      SELECT object_name(object_id) AS name    
          ,index_id, allocation_unit_id  
      FROM sys.allocation_units AS au  
          INNER JOIN sys.partitions AS p  
              ON au.container_id = p.partition_id  
                  AND au.type = 2  
  ) AS obj  
      ON bd.allocation_unit_id = obj.allocation_unit_id  
WHERE database_id = DB_ID()  
GROUP BY name, index_id  
ORDER BY cached_pages_count DESC;

--Detail on CACHESTORE_SQLCP
SELECT 
	objtype AS 'Cached Object Type',
	COUNT(*) AS 'Number of Plans',
	SUM(CAST(size_in_bytes AS BIGINT))/1024/1024 AS 'Plan Cache Size (MB)',
	AVG(usecounts) AS 'Avg Use Count'
FROM sys.dm_exec_cached_plans
GROUP BY objtype
ORDER BY 'Plan Cache Size (MB)' DESC