DECLARE @ProcName VARCHAR(200) = 'ListGroupUsersTimesheetStatus'
DECLARE @Attributes TABLE (
	AttributeID INT,
	Name VARCHAR(200)
)
INSERT INTO @Attributes (AttributeID, Name)
VALUES
(1,'ANSI_PADDING'),
(2,'Parallel Plan'),
(4,'FORCEPLAN'),
(8,'CONCAT_NULL_YIELDS_NULL'),
(16,'ANSI_WARNINGS'),
(32,'ANSI_NULLS'),
(64,'QUOTED_IDENTIFIER'),
(128,'ANSI_NULL_DFLT_ON'),
(256,'ANSI_NULL_DFLT_OFF'),
(512,'NoBrowseTable'),
(1024,'TriggerOneRow'),
(2048,'ResyncQuery'),
(4096,'ARITH_ABORT'),
(8192,'NUMERIC_ROUNDABORT'),
(16384,'DATEFIRST'),
(32768,'DATEFORMAT'),
(65536,'LanguageID'),
(131072,'UPON'),
(262144,'ROWCOUNT')



select o.object_id, s.plan_handle, h.query_plan, att.Names
from sys.objects o 
inner join sys.dm_exec_procedure_stats s on o.object_id = s.object_id
cross apply sys.dm_exec_query_plan(s.plan_handle) h
cross apply (
	select * from sys.dm_exec_plan_attributes(s.plan_handle) a
	where a.attribute = 'set_options'
) so
outer apply (
	select STRING_AGG(Name, ', '+CHAR(13)+CHAR(10)) Names
	from @Attributes
	where AttributeID & CONVERT(INT, so.value) <> 0
) att
where o.object_id = object_id(@ProcName)