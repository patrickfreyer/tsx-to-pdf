import React from 'react';

// Mock implementation of the icons from lucide-react
const IconComponent = ({ size = 24, className = '', children }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const BrainCircuit = (props) => (
  <IconComponent {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </IconComponent>
);

const Database = (props) => (
  <IconComponent {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </IconComponent>
);

const Code = (props) => (
  <IconComponent {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </IconComponent>
);

const ArrowRight = (props) => (
  <IconComponent {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </IconComponent>
);

const BarChart4 = (props) => (
  <IconComponent {...props}>
    <path d="M3 3v18h18" />
    <path d="M7 16v-3" />
    <path d="M11 16v-8" />
    <path d="M15 16v-5" />
    <path d="M19 16v-2" />
  </IconComponent>
);

const MessageSquare = (props) => (
  <IconComponent {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </IconComponent>
);

const Shield = (props) => (
  <IconComponent {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </IconComponent>
);

const Lock = (props) => (
  <IconComponent {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconComponent>
);

const ProcessVisualization = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      background: 'linear-gradient(to bottom right, #EBF4FF, #EEF2FF)',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#3730A3',
        marginBottom: '1.5rem'
      }}>How Claude Uses MCP to Access Your Data Securely</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '56rem'
      }}>
        {/* Step 1: Question to Claude */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flexShrink: 0,
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <MessageSquare size={32} className="text-indigo-600" />
          </div>
          <div style={{
            marginLeft: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexGrow: 1
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1F2937',
              marginBottom: '0.25rem'
            }}>1. Your Question</h3>
            <p style={{
              color: '#4B5563',
              fontSize: '0.875rem'
            }}>
              You ask Claude a business question in plain English, without needing to know SQL
            </p>
            <div style={{
              marginTop: '0.5rem',
              background: '#F3F4F6',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontStyle: 'italic',
              color: '#374151'
            }}>
              "What were our top-performing products by region last quarter?"
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0.25rem 0'
        }}>
          <ArrowRight style={{ color: '#818CF8' }} size={20} />
        </div>
        
        {/* Step 2: MCP Architecture */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flexShrink: 0,
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <Shield size={32} style={{ color: '#059669' }} />
          </div>
          <div style={{
            marginLeft: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexGrow: 1
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1F2937',
              marginBottom: '0.25rem'
            }}>2. Model Context Protocol (MCP)</h3>
            <p style={{
              color: '#4B5563',
              fontSize: '0.875rem'
            }}>
              Claude connects to your database through MCP, an open protocol that standardizes how AI models access external data sources securely
            </p>
            <div style={{
              marginTop: '0.75rem',
              background: '#F9FAFB',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  background: '#E0E7FF',
                  fontSize: '0.75rem'
                }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: '#3730A3',
                    marginBottom: '0.25rem'
                  }}>Claude (MCP Host)</div>
                  <div style={{ color: '#4F46E5' }}>Processes your question</div>
                </div>
                <ArrowRight style={{ color: '#10B981', margin: '0 0.25rem' }} size={16} />
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  background: '#D1FAE5',
                  fontSize: '0.75rem'
                }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: '#065F46',
                    marginBottom: '0.25rem'
                  }}>MCP Client</div>
                  <div style={{ color: '#059669' }}>Maintains connection</div>
                </div>
                <ArrowRight style={{ color: '#10B981', margin: '0 0.25rem' }} size={16} />
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  background: '#DBEAFE',
                  fontSize: '0.75rem'
                }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: '#1E40AF',
                    marginBottom: '0.25rem'
                  }}>MCP Server</div>
                  <div style={{ color: '#2563EB' }}>Accesses your database</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0.25rem 0'
        }}>
          <ArrowRight style={{ color: '#818CF8' }} size={20} />
        </div>
        
        {/* Step 3: SQL Generation via MCP */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flexShrink: 0,
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <Code size={32} style={{ color: '#4F46E5' }} />
          </div>
          <div style={{
            marginLeft: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexGrow: 1
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1F2937',
              marginBottom: '0.25rem'
            }}>3. SQL Query Generation</h3>
            <p style={{
              color: '#4B5563',
              fontSize: '0.875rem'
            }}>
              Claude crafts SQL queries and sends them through the MCP server, which securely executes them on your database
            </p>
            <div style={{
              marginTop: '0.5rem',
              background: '#F3F4F6',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#374151'
            }}>
              SELECT product_name, region, SUM(revenue) as total_revenue<br/>
              FROM sales<br/>
              WHERE quarter = 'Q4'<br/>
              GROUP BY product_name, region<br/>
              ORDER BY total_revenue DESC
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0.25rem 0'
        }}>
          <ArrowRight style={{ color: '#818CF8' }} size={20} />
        </div>
        
        {/* Step 4: Security Benefits */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flexShrink: 0,
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <Lock size={32} style={{ color: '#4F46E5' }} />
          </div>
          <div style={{
            marginLeft: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexGrow: 1
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1F2937',
              marginBottom: '0.25rem'
            }}>4. Data Security</h3>
            <p style={{
              color: '#4B5563',
              fontSize: '0.875rem'
            }}>
              Your data remains within your infrastructure. The MCP server follows best practices for securing your data:
            </p>
            <div style={{
              marginTop: '0.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem'
            }}>
              <div style={{
                background: '#D1FAE5',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#065F46'
              }}>
                <span style={{ fontWeight: 'bold' }}>✓ Data doesn't leave your system</span>
              </div>
              <div style={{
                background: '#D1FAE5',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#065F46'
              }}>
                <span style={{ fontWeight: 'bold' }}>✓ Controlled access permissions</span>
              </div>
              <div style={{
                background: '#D1FAE5',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#065F46'
              }}>
                <span style={{ fontWeight: 'bold' }}>✓ Query validation & sanitization</span>
              </div>
              <div style={{
                background: '#D1FAE5',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#065F46'
              }}>
                <span style={{ fontWeight: 'bold' }}>✓ Standardized security protocols</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0.25rem 0'
        }}>
          <ArrowRight style={{ color: '#818CF8' }} size={20} />
        </div>
        
        {/* Step 5: Query Refinement */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flexShrink: 0,
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <BrainCircuit size={32} style={{ color: '#4F46E5' }} />
          </div>
          <div style={{
            marginLeft: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexGrow: 1
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1F2937',
              marginBottom: '0.25rem'
            }}>5. Iterative Refinement</h3>
            <p style={{
              color: '#4B5563',
              fontSize: '0.875rem'
            }}>
              Claude iteratively improves queries through the MCP connection until it gets comprehensive results
            </p>
            <div style={{
              marginTop: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <div style={{
                background: '#FEE2E2',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#B91C1C'
              }}>Initial Query: Missing product categories</div>
              <div style={{
                background: '#FEF3C7',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#92400E'
              }}>Refined Query: Added year-over-year comparison</div>
              <div style={{
                background: '#D1FAE5',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#065F46'
              }}>Final Query: Complete data retrieved ✓</div>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0.25rem 0'
        }}>
          <ArrowRight style={{ color: '#818CF8' }} size={20} />
        </div>
        
        {/* Step 6: Visualization */}
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            flexShrink: 0,
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <BarChart4 size={32} style={{ color: '#4F46E5' }} />
          </div>
          <div style={{
            marginLeft: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexGrow: 1
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1F2937',
              marginBottom: '0.25rem'
            }}>6. Interactive Dashboard</h3>
            <p style={{
              color: '#4B5563',
              fontSize: '0.875rem'
            }}>
              The MCP server returns data to Claude, which transforms it into interactive visualizations and insights
            </p>
            <div style={{
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                background: '#EEF2FF',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #E0E7FF',
                width: '100%'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>Top Products by Region (Q4)</div>
                <div style={{
                  height: '6rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '3rem',
                      background: '#6366F1',
                      height: '5rem',
                      borderTopLeftRadius: '0.25rem',
                      borderTopRightRadius: '0.25rem'
                    }}></div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#4B5563',
                      marginTop: '0.25rem'
                    }}>Product A</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6B7280'
                    }}>North</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '3rem',
                      background: '#4F46E5',
                      height: '4rem',
                      borderTopLeftRadius: '0.25rem',
                      borderTopRightRadius: '0.25rem'
                    }}></div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#4B5563',
                      marginTop: '0.25rem'
                    }}>Product B</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6B7280'
                    }}>East</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '3rem',
                      background: '#4338CA',
                      height: '3rem',
                      borderTopLeftRadius: '0.25rem',
                      borderTopRightRadius: '0.25rem'
                    }}></div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#4B5563',
                      marginTop: '0.25rem'
                    }}>Product C</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6B7280'
                    }}>West</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '3rem',
                      background: '#3730A3',
                      height: '2rem',
                      borderTopLeftRadius: '0.25rem',
                      borderTopRightRadius: '0.25rem'
                    }}></div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#4B5563',
                      marginTop: '0.25rem'
                    }}>Product D</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6B7280'
                    }}>South</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#E0E7FF',
        borderRadius: '0.5rem',
        border: '1px solid #C7D2FE',
        maxWidth: '32rem'
      }}>
        <p style={{
          color: '#3730A3',
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          <strong>Think of MCP like a USB-C port for AI applications</strong> — just as USB-C provides a standardized way to connect devices to peripherals, MCP provides a standardized way to connect AI models to different data sources and tools
        </p>
      </div>
    </div>
  );
};

export default ProcessVisualization; 