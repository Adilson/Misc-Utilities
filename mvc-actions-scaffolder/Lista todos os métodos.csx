//These vars should be replaced by the actual values
var initialType = typeof([[TYPE OF SOME CONTROLLER CLASS]]);
var otherAreaNamespace = "[[NAMESPACE OF EXTERNAL AREA]]";

var controllers = initialType.Assembly.GetTypes().Where(x => x.IsSubclassOf(typeof(System.Web.Mvc.Controller))).ToList().AsEnumerable();

var rx = new System.Text.RegularExpressions.Regex("Controller$");
int totalActions = 0;
System.Reflection.MethodInfo methodX = null;
string wholeContent = "";
foreach (var controller in controllers)
{
    var actions = controller.GetMethods().Where(m => m.ReturnType.IsSubclassOf(typeof(System.Web.Mvc.ActionResult))).ToList();

    var controllerName = rx.Replace(controller.Name, "");
	string area = "";
	if (controller.Namespace.StartsWith(otherAreaNamespace))
		area = "/Extranet";
		
    foreach (var method in actions)
    {
        var args = method.GetParameters().ToArray();
        string queryString = "";
        string remark = "";
        if (args.Length > 0)
        {
            queryString += "?";
            for (int i=0; i<args.Length; i++)
            {
                if (i > 0)
                    queryString += "&";
                queryString += args[i].Name + "=";
                if (args[i].ParameterType == typeof(int))
                    queryString += "999";
                else if (args[i].ParameterType == typeof(string))
                    queryString += "XXXXX";
                else if (args[i].ParameterType == typeof(decimal))
                    queryString += "99.99";
                else if (args[i].ParameterType == typeof(DateTime))
                    queryString += "2017-01-01";
                else if (args[i].ParameterType == typeof(DateTimeOffset))
                    queryString += "2017-01-01T00:00:00.000-03:00";
                else if (args[i].ParameterType == typeof(Boolean))
                    queryString += "true";
                else if (!args[i].ParameterType.IsValueType)
				{
                    queryString += "{object}";
					remark += " --Complex Arg";
				}
                else
				{
                    queryString += "{other-type}";
					remark += " --Unknown Arg";
				}
				if (args[i].Name.ToLower().EndsWith("id"))
					remark += "  --EntityID";
            }
        }

        
        Console.WriteLine($"{area}/{controllerName}/{method.Name}{queryString}{remark}");
		wholeContent += $"{area}/{controllerName}/{method.Name}{queryString}{remark}" + "\n";
        totalActions++;
    }
}
Console.WriteLine($"Total:{totalActions}");
wholeContent += $"Total:{totalActions}" + "\n";
System.Windows.Clipboard.SetText(wholeContent);
