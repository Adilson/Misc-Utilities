SELECT T.text, H.query_sql_text, * 
FROM sys.dm_exec_requests R
cross apply sys.dm_exec_sql_text(r.sql_handle) T
inner join sys.dm_exec_sessions S on s.session_id = r.session_id
left join sys.query_store_query_text H ON H.statement_sql_handle = R.statement_sql_handle
WHERE sql_handle is not null
	and R.session_id <> @@SPID

