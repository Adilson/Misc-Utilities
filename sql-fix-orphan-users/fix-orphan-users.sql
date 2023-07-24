DECLARE @UsersToFix TABLE (
	UserID INT identity(1,1),
	UserName sysname
)
insert into @UsersToFix (UserName)
select p.name
from sys.database_principals p
where p.type in ('G','S','U')
and p.sid not in (select sid from sys.server_principals)
and p.name not in (
    'dbo',
    'guest',
    'INFORMATION_SCHEMA',
    'sys',
    'MS_DataCollectorInternalUser'
)

select * from @UsersToFix

DECLARE @UserName sysname
DECLARE @Id INT
SET @ID = 0
WHILE (1=1)
begin
	select top 1
		@UserName = UserName,
		@ID = UserID
	from @UsersToFix
	where UserID > @ID

	if (@@ROWCOUNT = 0)
		break

	DECLARE @SqlCommand NVARCHAR(2000)
	SET @SqlCommand = N'ALTER USER [' + @UserName + N'] WITH LOGIN=[' + @UserName + N']'
	exec sp_executeSQL @SqlCommand
end