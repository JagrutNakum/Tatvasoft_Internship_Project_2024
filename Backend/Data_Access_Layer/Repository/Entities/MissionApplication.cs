﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repository.Entities
{
    public class MissionApplication : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public int MissionId { get; set; }
        
       public int UserId { get; set; }

       // public string MissionTitle { get; set;}
        
       // public string UserName { get; set; }
        
       // public string UserImage { get; set; }

        [Column(TypeName = "timestamp without time zone")]
        public DateTime AppliedDate { get; set; }
        public bool Status { get; set; }
        public int Sheet { get; set; }

    }

    public class MissionApplicationDTO : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public int MissionId { get; set; }
        public int UserId { get; set; }

        [Column(TypeName = "timestamp without time zone")]
        public DateTime AppliedDate { get; set; }
        public bool Status { get; set; }
        public int Sheet { get; set; }

    }
}
