SELECT T.text, H.query_sql_text, * 
FROM sys.dm_exec_requests R
cross apply sys.dm_exec_sql_text(r.sql_handle) T
left join sys.query_store_query_text H ON H.statement_sql_handle = R.statement_sql_handle
WHERE sql_handle is not null
	and R.session_id <> @@SPID


	