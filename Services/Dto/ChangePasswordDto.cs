using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Services.Dto
{
    public class ChangePasswordDto
    {
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
         ErrorMessage = "The Password should be One Upper case one lower Case , non alphanumeric and at least 6 characters ")]
        public string NewPassword { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
        ErrorMessage = "The Password should be One Upper case one lower Case , non alphanumeric and at least 6 characters ")]
        public string oldPassword { get; set; }
    }
}
