# 🗺️ H&F Tactical Geolocation Data for Splunk

## 📋 Overview

Three geolocation CSV files have been created for comprehensive map visualizations in Splunk:

1. **`geolocation_access_logs.csv`** - User access logs with global coordinates
2. **`field_operations_gps.csv`** - Mobile field agent GPS tracking
3. **`security_incidents_geo.csv`** - Security incidents with threat actor locations

## 🎯 Splunk Map Visualization Setup

### **1. Data Ingestion**

**Upload CSV Files to Splunk:**
```
Settings → Data Inputs → Upload → Choose Files
- Select each CSV file
- Set Source Type: csv
- Set Index: hf_tactical (or create new index)
```

**Field Extraction:**
```
Settings → Fields → Field Extractions → New
- Apply to: hf_tactical index
- Extract latitude and longitude as numeric fields
```

### **2. Basic Map Searches**

**Global Access Attempts:**
```splunk
index=hf_tactical source="geolocation_access_logs.csv" 
| stats count by latitude, longitude, city, country, risk_score
| geostats latfield=latitude longfield=longitude count
```

**Field Operations Tracking:**
```splunk
index=hf_tactical source="field_operations_gps.csv"
| stats count by latitude, longitude, agent_name, activity_type
| geostats latfield=latitude longfield=longitude count by agent_name
```

**Security Incident Heatmap:**
```splunk
index=hf_tactical source="security_incidents_geo.csv"
| stats count by latitude, longitude, city, country, severity
| geostats latfield=latitude longfield=longitude count by severity
```

### **3. Advanced Map Visualizations**

**Threat Actor Origins:**
```splunk
index=hf_tactical source="security_incidents_geo.csv" 
| stats count by latitude, longitude, country, threat_actor, severity
| eval threat_level=case(severity="CRITICAL",4, severity="HIGH",3, severity="MEDIUM",2, severity="LOW",1)
| geostats latfield=latitude longfield=longitude sum(threat_level) as total_threat by country
```

**Real-time Field Operations:**
```splunk
index=hf_tactical source="field_operations_gps.csv" 
| eval _time=strptime(timestamp, "%Y-%m-%d %H:%M:%S")
| where _time > relative_time(now(), "-1h")
| stats latest(latitude) as lat, latest(longitude) as lon, latest(activity_type) as activity by agent_name
| geostats latfield=lat longfield=lon count by agent_name, activity
```

**Access Risk Analysis:**
```splunk
index=hf_tactical source="geolocation_access_logs.csv"
| eval risk_numeric=case(risk_score="CRITICAL",4, risk_score="HIGH",3, risk_score="MEDIUM",2, risk_score="LOW",1)
| stats avg(risk_numeric) as avg_risk, count by latitude, longitude, country
| where avg_risk > 2
| geostats latfield=latitude longfield=longitude avg_risk
```

### **4. Dashboard Creation**

**Create Geolocation Dashboard:**
```xml
<dashboard>
  <label>H&F Tactical - Global Operations</label>
  <row>
    <panel>
      <title>Global Access Attempts</title>
      <map>
        <search>
          <query>index=hf_tactical source="geolocation_access_logs.csv" | stats count by latitude, longitude, country, risk_score | geostats latfield=latitude longfield=longitude count by risk_score</query>
        </search>
        <option name="mapping.type">marker</option>
        <option name="mapping.markerSize">medium</option>
      </map>
    </panel>
  </row>
  <row>
    <panel>
      <title>Field Operations</title>
      <map>
        <search>
          <query>index=hf_tactical source="field_operations_gps.csv" | stats count by latitude, longitude, agent_name | geostats latfield=latitude longfield=longitude count by agent_name</query>
        </search>
        <option name="mapping.type">marker</option>
        <option name="mapping.markerSize">small</option>
      </map>
    </panel>
  </row>
  <row>
    <panel>
      <title>Security Incidents</title>
      <map>
        <search>
          <query>index=hf_tactical source="security_incidents_geo.csv" | stats count by latitude, longitude, severity | geostats latfield=latitude longfield=longitude count by severity</query>
        </search>
        <option name="mapping.type">choropleth</option>
        <option name="mapping.choroplethLayer.colorMode">categorical</option>
      </map>
    </panel>
  </row>
</dashboard>
```

## 🌍 Geographic Data Points

### **Legitimate Office Locations:**
- **Washington, DC** (38.9072, -77.0369) - HQ Operations
- **Los Angeles, CA** (34.0522, -118.2437) - West Coast Office  
- **San Francisco, CA** (37.7749, -122.4194) - Tech Operations
- **Denver, CO** (39.7392, -104.9903) - Central Operations

### **Field Operations (US):**
- **Dallas, TX** - FBI Field Office coordination
- **Miami, FL** - Coast Guard operations
- **Chicago, IL** - SWAT training
- **New York, NY** - Counter-terrorism
- **Houston, TX** - DEA operations
- **Seattle, WA** - Cyber security
- **Phoenix, AZ** - Border patrol
- **Nashville, TN** - Regional coordination

### **Threat Actor Locations:**
- **Moscow, Russia** - APT29 (Critical threats)
- **Beijing, China** - APT1 (Data exfiltration)
- **Tokyo, Japan** - Unknown actors (Brute force)
- **London, UK** - Reconnaissance attempts
- **Paris, France** - Malware uploads
- **Berlin, Germany** - Privilege escalation
- **Seoul, South Korea** - APT37 (Zero-day exploits)

### **Security Incident Hotspots:**
- **Europe**: 12 incidents (48% of total)
- **Asia**: 8 incidents (32% of total)  
- **Americas**: 3 incidents (12% of total)
- **Oceania**: 2 incidents (8% of total)

## 📊 Splunk Search Examples

### **Top Threat Countries:**
```splunk
index=hf_tactical source="security_incidents_geo.csv"
| stats count by country, severity
| eval weight=case(severity="CRITICAL",4, severity="HIGH",3, severity="MEDIUM",2, severity="LOW",1)
| stats sum(eval(count*weight)) as threat_score by country
| sort -threat_score
```

### **Field Agent Activity Timeline:**
```splunk
index=hf_tactical source="field_operations_gps.csv"
| eval _time=strptime(timestamp, "%Y-%m-%d %H:%M:%S")
| timechart span=1h count by agent_name
```

### **Risk Score Correlation:**
```splunk
index=hf_tactical source="geolocation_access_logs.csv"
| stats count by country, risk_score
| chart count over country by risk_score
```

### **Mobile vs Desktop Access:**
```splunk
index=hf_tactical source="geolocation_access_logs.csv"
| stats count by device_type, location_type
| chart count over device_type by location_type
```

## 🎯 Key Insights for Analysis

### **Security Patterns:**
- **67% of critical incidents** originate from Russia/China
- **Mobile devices** show higher risk scores in field operations
- **After-hours access** correlates with higher threat levels
- **Unknown users** primarily from foreign IP ranges

### **Operational Intelligence:**
- **14 active field agents** across 12 US cities
- **Real-time GPS tracking** for mission coordination
- **Equipment access** logged by location and time
- **Mission status** updates with geographic context

### **Threat Landscape:**
- **APT groups** identified: APT1, APT28, APT29, APT37, APT40
- **Attack vectors**: SQL injection, malware, phishing, insider threats
- **Geographic clustering** of similar attack types
- **Time-based patterns** in threat actor activity

## 🔧 Troubleshooting

### **Common Issues:**

**Coordinates not plotting:**
- Verify latitude/longitude are numeric fields
- Check for missing or invalid coordinate data
- Ensure proper field extraction

**Map not loading:**
- Confirm Splunk mapping app is installed
- Check data source and index names
- Verify search syntax

**Performance issues:**
- Limit time ranges for large datasets
- Use statistical commands to reduce data volume
- Consider data model acceleration

---
**Perfect for demonstrating global threat intelligence and operational awareness in Splunk!** 🗺️
