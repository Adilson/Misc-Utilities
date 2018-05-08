import pandas

#read a IIS log for analysis
filename = 'u_ex17050113.log'
headers = pandas.read_csv(filename, ' ', header=3, nrows=0)
headers = headers.columns[1:].tolist()
file = pandas.read_csv(filename, ' ', comment='#', names=headers)


#Media de tempo gasto
#file[file['cs-uri-stem'].str.contains('URL_REGEX',regex=True)].groupby(['cs-uri-stem'])['time-taken'].mean()