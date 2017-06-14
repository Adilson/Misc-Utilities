declare cur_NewQuery cursor read_only fast_forward
for
/************ PLACE HERE THE QUERY YOU WANT TO INSPECT **********************/
select
	'Query' Field1,
	N'De_Teste' Field2,
	12 Field3
/****************************************************************************/


open cur_NewQuery


DECLARE @ColumnsDefinition VARCHAR(MAX) = ''

select 
	--* 
	@ColumnsDefinition = @ColumnsDefinition + CASE WHEN @ColumnsDefinition = '' THEN '' ELSE ',' + CHAR(13) + CHAR(10) END + 
	'[' + CRC.column_name + '] ' + 
	UPPER(type_name(crc.data_type_sql)) +
	CASE 
		WHEN crc.data_type_sql IN (106,108) THEN
			'('+CONVERT(VARCHAR(10),crc.[column_precision]) +',' + CONVERT(VARCHAR(10),crc.[column_scale])+')'
		WHEN crc.data_type_sql IN (165,167,173,175) AND column_size between 0 and 8000 THEN
			'('+CONVERT(VARCHAR(10),crc.[column_size]) +')'
		WHEN crc.data_type_sql IN (165,167,173,175) THEN
			'(max)'
		WHEN crc.data_type_sql IN (231,239) AND column_size between 0 and 8000 THEN
			'('+CONVERT(VARCHAR(10),crc.[column_size]/2) +')'
		WHEN crc.data_type_sql IN (231,239) THEN
			'(max)'
		ELSE
			''
	END +
	CASE WHEN column_characteristics_flags & 4 = 0 THEN
		' not null'
	ELSE
		''
	END
from sys.syscursorrefs CR
inner join sys.syscursorcolumns CRC ON CRC.cursor_handle = CR.cursor_handl
where CR.cursor_scope = 2 and CR.reference_name = 'cur_NewQuery'
order by CRC.ordinal_position

select @ColumnsDefinition
close cur_NewQuery
deallocate cur_NewQuery;